// Global file that contain constants.
// Path's can be served here (NOTE! except routes within application, they must be served in the LinksService)

// images (development only)
export const imgPath: string = '../assets/images';
export const bgPath: string = `${imgPath}/background`;
export const bgDarkPath: string = `${bgPath}/fancy-bg-dark.jpg`;
export const bgLightPath: string = `${bgPath}/fancy-bg-light.jpg`;

// regex patterns
export const emailPattern: RegExp = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;
export const passwordPattern: RegExp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;