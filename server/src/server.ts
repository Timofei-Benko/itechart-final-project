const { PORT } = require('./common/config');
import app = require('./app');

app.listen(PORT, () =>
    console.log(`App is running on http://localhost:${PORT}`)
);
