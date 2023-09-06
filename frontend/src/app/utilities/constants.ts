// Global file that contain constants.
// Path's can be served here (NOTE! except routes within application, they must be served in the LinksService)

// images (development only)
export const imgPath: string = '../assets/images';
export const bgPath: string = `${imgPath}/background`;
export const bgDarkPath: string = `${bgPath}/fancy-bg-dark.jpg`;
export const bgLightPath: string = `${bgPath}/fancy-bg-light.jpg`;

// regex patterns (please consider using backslash escaping and provide them as plain strings in order of proper work)
export const emailPattern = "[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?";
export const passwordPattern = "^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$";