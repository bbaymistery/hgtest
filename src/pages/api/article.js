import fs from "fs";
import path from "path";
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
export default (req, res) => {
  try {
    let {
      query: { document },
    } = req;
    let filePath = path.resolve(process.cwd(), `./src/articles/${document}`);
    console.log(filePath);
    let isExist = fs.existsSync(filePath);
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    if (isExist) {
      let imageBuffer = fs.readFileSync(`${filePath}`, "utf-8");
      res.json({ status: 200, doc: imageBuffer });
    } else {
      res.json({ status: 403 });
    }
  } catch (error) {
    res.json({ status: 403 });
  }
};
