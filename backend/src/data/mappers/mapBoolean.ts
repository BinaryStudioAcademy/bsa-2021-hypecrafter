/* eslint-disable @typescript-eslint/no-explicit-any */
const mapBoolean = (res: any[]) => (!res ? [] : res.filter(Boolean));

export { mapBoolean };
