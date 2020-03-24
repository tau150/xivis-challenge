import request from 'utils/request';


const fetchAll = async () => {
  const config = {
    method: 'GET',
    url: 'https://api.myjson.com/bins/wyjyh',
  };

  return request(config);
};


export default fetchAll;
