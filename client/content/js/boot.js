import React from 'react';
import router from './router';

router.run((Root) => {
    React.render(<Root/>, document.getElementById('app'));
});
