export default (): boolean => {
    return Boolean(localStorage.getItem('is_signed_in'));
};
