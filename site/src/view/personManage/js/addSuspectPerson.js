
 function dataURLtoFile(dataurl, filename) {
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, {type:mime});
}
function addSuspectPerson(vue,base64url){
    let blob = dataURLtoFile(base64url, 'upload.jpg')
    let formData = new FormData();
    formData.append("file", blob);
    let config = {
        "Content-Type": "multipart/form-data"
    };
    vue.$axios
        .post("/upload/uploadFile", formData, config)
        .then(function(response) {
          if (response.data.length > 0) {
            let uploadId = response.data[0].uploadId;
            let personPhoto = response.data[0].id;
            let params = {
                identityCard: 'xxxx'+uploadId.substring(0,2)+"xxxx"+personPhoto.substring(0,2)+"xxxxxx",
                personName: '可疑人员',
                personDetailVO: {
                  personSex: "0",
                  uploadId: uploadId
                },
                personPhoto: personPhoto
            };
            const url = "/info/person/createPerson";
            vue.$axios({
                method: "post",
                url: url,
                data: params
            })
            .then(res => {
                vue.$message.success("新增重点人员成功");
            })
            .catch(error => {
                vue.$message.error('新增人员失败,'+error.response.data.message);
            });
          }
        })
        .catch(function(error) {
            console.log('error',error);
            vue.$message('图片上传失败，请重新上传');
        })
}
export {addSuspectPerson}