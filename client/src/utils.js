export function checkStatus(response) {
  if (!response.ok) {
    let error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
  return response;
}

export function parseJson(response) {
  return response.json();
}

export function log(object) {
  console.log(object);
}
