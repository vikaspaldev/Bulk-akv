# Azure Key Vault Bulk Secret Uploader

This Node.js script allows you to bulk upload secrets to an Azure Key Vault from a CSV file.

## Prerequisites

*   Node.js (version 14.x or later recommended)
*   An Azure account with an active subscription.
*   An Azure Key Vault instance.
*   Appropriate permissions for an Azure AD application / service principal (or your user account if running locally) to write secrets to the Key Vault. This script uses `DefaultAzureCredential` from the Azure SDK, which supports various authentication methods.

## Setup

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd <repository-directory>
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Configure environment variables:**
    *   Rename the `.env.example` file to `.env`.
    *   Open the `.env` file and set the `AZURE_KEY_VAULT_URI` to your Key Vault's URI (e.g., `https://your-key-vault-name.vault.azure.net/`).
    *   Ensure your environment is configured for `DefaultAzureCredential`. This could mean you are logged in via Azure CLI (`az login`), or you have environment variables like `AZURE_CLIENT_ID`, `AZURE_TENANT_ID`, and `AZURE_CLIENT_SECRET` set for a service principal. Refer to the [Azure Identity library documentation](https://learn.microsoft.com/en-us/javascript/api/overview/azure/identity-readme?view=azure-node-latest#defaultazurecredential) for more details on how `DefaultAzureCredential` sources credentials.

## CSV File Format

The CSV file should have the following header columns:

*   `secretName`: The name of the secret to be created in Azure Key Vault.
*   `secretValue`: The value of the secret.

Example `secrets.csv`:
```csv
secretName,secretValue
MySecret1,ThisIsASecretValue123
AnotherSecret,SuperSecretPassword!
```

**Note:** Ensure `secretName` and `secretValue` fields are not empty in your CSV. Rows with empty values for these fields will be skipped. Secret names must comply with Azure Key Vault naming conventions (e.g., alphanumeric characters and hyphens).

## Usage

1.  Prepare your CSV file with the secrets you want to upload.
2.  Run the script:
    ```bash
    node index.js
    ```
3.  The script will prompt you to enter the path to your CSV file.
4.  Upon successful execution, secrets will be uploaded to your configured Azure Key Vault. Check the console output for progress and any errors.

## Error Handling

*   The script includes basic error handling for file operations, CSV parsing, and Azure Key Vault interactions.
*   Error messages will be logged to the console.
*   Ensure the service principal or user account has the "Key Vault Secrets Officer" role or equivalent permissions on the target Key Vault to write secrets.

## Contributing

Contributions are welcome! Please feel free to submit a pull request.

## License

This project is licensed under the MIT License.
