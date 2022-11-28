import { PageConfig } from '@jupyterlab/coreutils';


export async function getKibanaURL() {
    console.log("get kibana url")
    var requestUrl = new URL(PageConfig.getBaseUrl() + 'jupyter-server-extension/getKibanaUrl');
    console.log(requestUrl.href)
  
    let response : any = await fetch(requestUrl.href, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
  
  
    if (response.status >= 200 && response.status < 400) {
      console.log("request went well")
    }else{
      //let res = response.json()
      console.log("something went wrong with request!!!")
      //console.log(response.json())
    }
  
    return response.json();
  }