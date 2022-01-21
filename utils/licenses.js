$.ajax({
    type: "GET",
    url: "https://raw.githubusercontent.com/spdx/license-list-data/master/json/licenses.json",
    async: true,
    dataType: "json",
    success: function (data) {
       const licenseData = data.licenses;
       for (let i = 0; i < licenseData.length; i++) {
          const licenseId = licenseData[i].licenseId;
          const licenseName = licenseData[i].name;
          console.log(licenseId, licenseName);
       }
    },
    error: function (xhr, status, err) { },
 });