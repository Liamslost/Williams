import app from "./app";
import { preloadData } from "./services/dataService";

const PORT = process.env.PORT || 3001;

preloadData().then(() => {
  app.listen(PORT, () => {
    console.log("Data preloaded");
    console.log(`Server is running on port ${PORT}`);
  });
});
