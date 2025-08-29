import { app } from './app.js';

const port = process.env.PORT || 4002;
app.listen(port, () => {
  console.log(`Account service listening on port ${port}`);
});
