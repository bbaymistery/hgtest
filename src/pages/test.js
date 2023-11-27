import React from "react";
import fs from "fs";
import path from "path";

export default function HomePage(props) {
  return <pre>{JSON.stringify(props)}</pre>;
}

export async function getServerSideProps({ req, res, query }) {
  try {
    let dirs = fs.readdirSync(path.resolve(__dirname, "../../../src/articles"));
    return {
      props: {
        status: 200,
        dir: process.cwd(),
        __dirname: __dirname,
        dirs,
      },
    };
  } catch (error) {
    console.log(error.message);
    return { props: {} };
  }
}
