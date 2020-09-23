const wait = async (delay: number) => {
  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
};

export const encrypt = async (data: string) => {
  await wait(500);
  return data;
};

export const decrypt = async (data: string) => {
  await wait(500);
  return data;
};
