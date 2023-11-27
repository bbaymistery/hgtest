import React, { useEffect } from "react";
import Layout from "../components/layouts/Layout";
//
import { useDispatch } from "react-redux";
import { getAppData } from "../store/pickUpDropOffReducer/pickUpDropAction";
import OneWay from "../components/elements/Hero/OneWay/OneWay";
import env from "../resources/env";

import CustomError from "../components/elements/CustomError";
export default function HomePage(props) {
  let { status, file, hasSearchEngine, data, head, filename, articlePath } =
    props;
  const dispacth = useDispatch();

  if (!filename) return <CustomError />;

  useEffect(() => {
    dispacth(getAppData());
  }, []);

  return (
    <Layout
      title={head?.title}
      description={head?.description}
      keywords={head?.keywords}
    >
      {status === 200 ? (
        <React.Fragment>
          <div
            style={{ maxWidth: "calc(1740px)", width: "calc(100%)", padding: 20, boxSizing: "border-box", margin: "20px auto", }}
            dangerouslySetInnerHTML={{ __html: `<div>${file[0]}</div>` }}
          ></div>
          {hasSearchEngine ? (
            <div style={{ maxWidth: "1200px", margin: "0 auto", }}  >
              <OneWay fromArticle={true} preSelectedPickupPoint={data.preSelectedPickupPoints} preSelectedDropoffPoint={data.preSelectedDropoffPoints} />
            </div>
          ) : (
            <React.Fragment></React.Fragment>
          )}
          {typeof file[1] === "string" ? (
            <div
              style={{
                maxWidth: "calc(1740px)",
                width: "calc(100%)",
                padding: 20,
                boxSizing: "border-box",
                margin: "20px auto",
              }}
              dangerouslySetInnerHTML={{ __html: file[1] }}
            ></div>
          ) : (
            <React.Fragment></React.Fragment>
          )}
        </React.Fragment>
      ) : (
        <div>404 Not Found</div>
      )}
    </Layout>
  );
}

export async function getServerSideProps({ req, res, query }) {
  let { article: filename } = query || {};
  if (filename === "heathrowtogatwick.aspx") {
    return {
      redirect: {
        destination: `/about`,
        permanent: true,
      },
    };
  }

  // console.log(filename);

  //codes for show article
  // if (filename.includes(".aspx")) {
  //   filename = filename.replace(".aspx", "");
  //   return {
  //     redirect: {
  //       destination: `/${filename}`,
  //       permanent: true,
  //     },
  //   };
  // }
  //  else
  //  {
  try {
    let requestArticle = await fetch(
      `${env.websiteDomain}/api/article?document=${filename}.html`
    );

    let responseArticle = await requestArticle.json();
    // console.log(responseArticle);


    let file = responseArticle.status === 200 ? responseArticle.doc : "";
    let hasSearchEngine = false;
    file = file.split("\n");
    let fileObject = file[0].replace("<!-- ", "").replace(" -->", "");
    fileObject = JSON.parse(fileObject);
    // console.log(fileObject);

    let { data = {}, head = {} } = fileObject;
    file.shift();
    file = file.join("\n");
    if (file.includes("<!-- search_engine -->")) {
      hasSearchEngine = true;
      file = file.split("<!-- search_engine -->");
    } else {
      file = [file];
    }
    return {
      props: {
        status: 200,
        file,
        hasSearchEngine,
        data,
        filename,
        head,
      },
    };
  } catch (error) {
    return { props: { status: 403, hasSearchEngine: false, data: {} } };
  }
  // }
}
