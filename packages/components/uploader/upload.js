import * as qiniu from 'qiniu-js';
import axios from 'axios';

function getToken () {
  return axios.get ('/api/token').then (data => data.data);
}

async function upload (file) {
  let key = file.name;
  let token = await getToken ();
  return new Promise ((resolve, reject) => {
    var observable = qiniu.upload (file, key, token, {}, {});

    observable.subscribe (
      function next () {},
      function error (err) {
        reject (err);
      },
      function complete (res) {
        resolve (res.key);
      }
    );
  });
}

export default upload;
