import { UserType } from "../types/global";

export const setData = (data: any) => {
  try {
    if (data) {
      localStorage.setItem("techran-form-data", JSON.stringify(data));
    }
  } catch (error) {
    console.log(">>>>: utils error : setData -> error", error);
  }
};

export const getData = (): UserType[] | undefined => {
  try {
    const data = localStorage.getItem("techran-form-data");
    if (data) {
      return JSON.parse(data) as UserType[];
    }
  } catch (error) {
    console.log(">>>>: utils error : setData -> error", error);
  }
};

export const addData = (data: UserType) => {
  try {
    const oldData = getData();
    if (oldData) {
      oldData.push(data);
      setData(oldData);
    } else {
      setData([data]);
    }
  } catch (error) {
    console.log(">>>>: utils error : addData -> error", error);
  }
};

export const editData = (data: UserType) => {
  try {
    const oldData = getData();
    if (oldData) {
      const newData = oldData.map((item) => {
        if (item.firstName === data.firstName) {
          return data;
        }
        return item;
      });
      setData(newData);
    }
  } catch (error) {
    console.log(">>>>: utils error : editData -> error", error);
  }
};

export const deleteData = (data: UserType) => {
  try {
    const oldData = getData();
    if (oldData) {
      const newData = oldData.filter((item) => {
        if (item.firstName === data.firstName) {
          return false;
        }
        return true;
      });

      console.log("olddata", oldData);
      console.log("newdata", newData);
      setData(newData);
    }
  } catch (error) {
    console.log(">>>>: utils error : deleteData -> error", error);
  }
};
