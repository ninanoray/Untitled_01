/* 이메일 확인 API: /api/auth/validate-email */
export const EMAIL_LOGIN = "S01_AUTH"; // 200: 가입한 이력이 있는 이메일
export const EMAIL_CHECKED = "S02_AUTH"; // 302: 이미 이메일 인증을 완료한 이메일
export const EMAIL_NEW = "CE01_AUTH"; // 404: 저장되지 않은 새로운 이메일
export const EMAIL_BLOCKED = "CE02_AUTH"; // 401: 차단된 이메일

export const SIGNIN_SUCCESS = "S03_AUTH"; // 200: 로그인 성공
export const SIGNIN_FAILED = "CE03_AUTH"; // 401: 로그인 실패
