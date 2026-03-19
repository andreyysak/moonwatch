const url = process.env.EXPO_PUBLIC_API_URL;

export const redirectWithGoogleAuth = () => {
    return `${url}/auth/google`;
};