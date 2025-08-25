import contentfulManagement from "contentful-management";
import { createClient } from "contentful-management";

const SPACE_ID = "tpcs1tvipqs5";
const ACCESS_TOKEN = "-KLDK621J9yUh93LYorLeVRlnvnukrlhEg615XQ_LIk";

const mgmtClient = contentfulManagement.createClient({
  accessToken: ACCESS_TOKEN,
});

export default mgmtClient;
