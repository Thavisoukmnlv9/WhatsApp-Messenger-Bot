export const buildFormData = ({ data, fieldName = "images" }: { data: Record<string, any>, fieldName?: string }) => {
  const formData = new FormData();
  if (Array.isArray(data[fieldName])) {
    data[fieldName].forEach((image: { file: File }) => {
      if (image.file) {
        formData.append(fieldName, image.file);
      }
    });
  }
  Object.entries(data).forEach(([key, value]) => {
    if (key !== fieldName) {
      if (typeof value === 'object' && value !== null) {
        formData.append(key, JSON.stringify(value));
      } else {
        formData.append(key, value as string);
      }
    }
  });
  return formData;
};



export const appendArrayFiles = (
  formData: FormData,
  fieldName: string,
  files: Array<{ file: File }>
) => {
  files.forEach((item) => {
    if (item.file) {
      formData.append(fieldName, item.file);
    }
  });
};

export const appendObjectFields = ({
  formData,
  data,
  excludeKey,
}: {
  formData: FormData;
  data: Record<string, any>;
  excludeKey: string;
}) => {
  Object.entries(data).forEach(([key, value]) => {
    if (key === excludeKey) return;
    if (typeof value === "object" && value !== null) {
      formData.append(key, JSON.stringify(value));
    } else {
      formData.append(key, value as string);
    }
  });
};


// export const buildFormData = ({
//   data,
//   fieldName = "",
// }: {
//   data: Record<string, any>;
//   fieldName?: string;
// }) => {
//   const formData = new FormData();
//   if (Array.isArray(data[fieldName])) {
//     appendArrayFiles(formData, fieldName, data[fieldName]);
//   }
//   appendObjectFields({ formData, data, excludeKey: fieldName });
//   return formData;
// };