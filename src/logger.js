export const logger = (...messages) => {
    const styles = ['color: #FFFF00', 'background: black'].join(';');
    if (process.env.NODE_ENV === 'development') {
        console.log('%c%s', styles, ...messages);
    }
}
