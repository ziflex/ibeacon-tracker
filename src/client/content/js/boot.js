import React from 'react/addons';
import router from './router';

router.run((Root) => {
    React.render(<Root/>, document.getElementById('app'));
});
