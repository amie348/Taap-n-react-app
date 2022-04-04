import client from "./client";
const getAllApprovedApks = () => client.get('/apk/approved');
const getTrendingApks = () => client.get('/apk/trend');
const getDownloadApkLink = (id) => client.get(`/apk/temporary-download/${id}`);
const getAllCategories = () => client.get('/apk/getAllCate', {}, {
  onDownloadProgress: (prog) => {
    console.log("progress", prog);
  }
});

const getSameCateApks = (cate) => client.get(`/apk/samecate/${cate}`);

export const uploadApk = (listing, onUploadProgress) => {
  const data = new FormData();
  data.append("title", listing.title);
  data.append("price", listing.price);
  data.append("categoryId", listing.category.value);
  data.append("description", listing.description);

  listing.images.forEach((image, index) =>
    data.append("images", {
      name: "image" + index,
      type: "image/jpeg",
      uri: image,
    })
  );

  if (listing.location)
    data.append("location", JSON.stringify(listing.location));
  return client.post('/addApk', data, {
    onUploadProgress: (progress) =>
      onUploadProgress(progress.loaded / progress.total),
  });
};

export default {
  uploadApk,
  getAllApprovedApks,
  getTrendingApks,
  getAllCategories,
  getSameCateApks,
  getDownloadApkLink
};
