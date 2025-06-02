const { SecretClient } = require('@azure/keyvault-secrets');
const { DefaultAzureCredential } = require('@azure/identity');

async function uploadSecretsToKeyVault(secrets, keyVaultUri) {
  try {
    const credential = new DefaultAzureCredential();
    const client = new SecretClient(keyVaultUri, credential);

    for (const secret of secrets) {
      try {
        await client.setSecret(secret.name, secret.value);
        console.log(`Successfully set secret: ${secret.name}`);
      } catch (error) {
        console.error(`Error setting secret ${secret.name}:`, error);
      }
    }
  } catch (error) {
    console.error('Error during Key Vault operations:', error);
  }
}

module.exports = uploadSecretsToKeyVault;
