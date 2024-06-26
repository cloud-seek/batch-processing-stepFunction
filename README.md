# AWS SAM Batch Processing with Step Functions, SQS, and Lambda

This repository contains a serverless application built using AWS Serverless Application Model (SAM). It demonstrates the power of AWS Step Functions for batch processing, leveraging S3, SQS, and Lambda. This setup provides a robust and scalable solution for processing large batches of data in parallel.

## Overview

### Importance of Batch Processing with Step Functions

Batch processing is crucial for handling large volumes of data efficiently. AWS Step Functions enable the orchestration of complex workflows, allowing for parallel processing, error handling, and state management. This setup ensures that large datasets can be processed in a distributed manner, maximizing throughput and reliability.

### Project Structure

- **Lambda Function (`Processing`)**: A Node.js 20 Lambda function that processes individual records from a batch.
- **SQS Queue (`Notification`)**: An SQS queue used to notify when there are errors during batch processing.
- **Step Function (`MyStepFunction`)**: A standard workflow that orchestrates the batch processing.

## Architecture

The architecture consists of the following components:

1. **Lambda Function (`DataProcess`)**:
    - Processes each item in the batch individually.
    - Written in Node.js 20.
    
2. **SQS Queue (`Notification`)**:
    - Receives error messages if the batch processing fails beyond a tolerable threshold.

3. **Step Function (`MyStepFunction`)**:
    - Standard type Step Function for orchestrating the workflow.
    - Input: A JSON file path in S3.
    - **Map State**:
        - Distributed map with a maximum concurrency of 10.
        - Processes each item in the JSON file using the `Processing` Lambda.
        - Writes the results back to S3.
        - Tolerates up to 50% failures before invoking error handling.
    - **Catch State**:
        - If more than 50% of the items fail, sends an error message to the SQS `Notification` queue.
    - **Final State**:
        - Ends the workflow if processing is successful.

## Deployment

### Prerequisites

- AWS CLI
- AWS SAM CLI

### Steps to Deploy

1. **Clone the repository**:
    ```bash
    git clone https://github.com/your-repo/aws-sam-batch-processing.git
    cd aws-sam-batch-processing
    ```

2. **Build the SAM application**:
    ```bash
    sam build
    ```

3. **Deploy the SAM application**:
    ```bash
    sam deploy --guided
    ```
    Follow the prompts to set up the stack name, AWS region, and S3 bucket for deployment.

## Detailed File Descriptions

### `template.yaml`

Defines the AWS resources for the application:
- Lambda function for processing.
- SQS queue for error notifications.
- Step Function for orchestrating the workflow.
- IAM roles and policies for necessary permissions.

### `lambda/app.js`

Contains the Lambda function code written in Node.js 20. This function processes individual records from the input JSON file.

### `lambda/package.json`

Defines the Node.js project, listing dependencies and metadata for the Lambda function.

## Usage

After deploying the stack, you can trigger the Step Function with an input JSON file path in S3. The Step Function will read the file, process each record in parallel using the Lambda function, and handle errors appropriately.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request if you have suggestions or improvements.

## License

This project is licensed under the MIT License.
