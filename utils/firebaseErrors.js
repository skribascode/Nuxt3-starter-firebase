
const firebaseAuthErrors = {
  "auth/invalid-login-credentials": "Les identifiants sont erronés",
  "INVALID_EMAIL": "Les identifiants sont érronés",
  "auth/app-deleted": "firebase.auth.errors.appDeleted",
  "auth/app-not-authorized": "firebase.auth.errors.appNotAuthorized",
  "auth/argument-error": "firebase.auth.errors.argumentError",
  "auth/invalid-api-key": "firebase.auth.errors.invalidApiKey",
  "auth/invalid-user-token": "firebase.auth.errors.invalidUserToken",
  "auth/network-request-failed": "firebase.auth.errors.networkRequestFailed",
  "auth/operation-not-allowed": "firebase.auth.errors.operationNotAllowed",
  "auth/requires-recent-login": "firebase.auth.errors.requiresRecentLogin",
  "auth/too-many-requests": "firebase.auth.errors.tooManyRequests",
  "auth/unauthorized-domain": "firebase.auth.errors.unauthorizedDomain",
  "auth/user-disabled": "firebase.auth.errors.userDisabled",
  "auth/user-token-expired": "firebase.auth.errors.userTokenExpired",
  "auth/web-storage-unsupported": "firebase.auth.errors.webStorageUnsupported",
  "auth/invalid-email": "firebase.auth.errors.invalidEmail",
  "auth/user-not-found": "firebase.auth.errors.userNotFound",
  "auth/wrong-password": "firebase.auth.errors.wrongPassword",
  "auth/email-already-in-use": "firebase.auth.errors.emailAlreadyInUse",
  "auth/account-exists-with-different-credential": "firebase.auth.errors.accountExistsWithDifferentCredential",
  "auth/credential-already-in-use": "firebase.auth.errors.credentialAlreadyInUse",
  "auth/user-mismatch": "firebase.auth.errors.userMismatch",
  "auth/provider-already-linked": "firebase.auth.errors.providerAlreadyLinked",
  "auth/no-such-provider": "firebase.auth.errors.noSuchProvider",
  "auth/invalid-credential": "firebase.auth.errors.invalidCredential",
  "auth/invalid-verification-code": "firebase.auth.errors.invalidVerificationCode",
  "auth/captcha-check-failed": "firebase.auth.errors.captchaCheckFailed",
  "auth/invalid-phone-number": "firebase.auth.errors.invalidPhoneNumber",
  "auth/missing-phone-number": "firebase.auth.errors.missingPhoneNumber",
  "auth/quota-exceeded": "firebase.auth.errors.quotaExceeded",
  "auth/tenant-id-mismatch": "firebase.auth.errors.tenantIdMismatch",
  "auth/unsupported-persistence-type": "firebase.auth.errors.unsupportedPersistenceType",
  "auth/unsupported-tenant-operation": "firebase.auth.errors.unsupportedTenantOperation"
}

export const translateFirebaseError = (error) => {
  return firebaseAuthErrors[error] || error
}
