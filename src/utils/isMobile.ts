interface ViewportDimensions {
    width: number;
    height: number;
}

const isMobile = (): boolean => {
    const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;

    // iOS detection
    if (/iPad|iPhone|iPod/.test(userAgent) && !(window as any).MSStream) {
        return true;
    }

    // Android detection
    if (/android/i.test(userAgent)) {
        return true;
    }

    // Other mobile user agents
    if (/Mobile|webOS|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)) {
        return true;
    }

    return false;
};

const isIOS = (): boolean => {
    const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
    return /iPad|iPhone|iPod/.test(userAgent) && !(window as any).MSStream;
};

const isAndroid = (): boolean => {
    const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
    return /android/i.test(userAgent);
};

const getMobileOperatingSystem = (): string => {
    const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;

    if (/windows phone/i.test(userAgent)) {
        return 'Windows Phone';
    }

    if (/android/i.test(userAgent)) {
        return 'Android';
    }

    if (/iPad|iPhone|iPod/.test(userAgent) && !(window as any).MSStream) {
        return 'iOS';
    }

    return 'unknown';
};

const getViewportDimensions = (): ViewportDimensions => {
    return {
        width: window.innerWidth,
        height: window.innerHeight,
    };
};

export { isMobile, isIOS, isAndroid, getMobileOperatingSystem, getViewportDimensions };
