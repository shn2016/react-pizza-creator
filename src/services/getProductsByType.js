import axios from 'axios';

export default type => axios.get('https://pizza-admin-api.herokuapp.com/product', {
  params: {
    filter: {
      where: {
        type,
      },
    },
  },
});
