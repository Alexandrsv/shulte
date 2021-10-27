export const logger = (...messages) => {
    const styles = ['color: #FFFF00', 'background: black'].join(';');
    if (process.env.NODE_ENV === 'development' || window?.__debug__) {
        console.log('%c%s', styles, ...messages);
    }
}
