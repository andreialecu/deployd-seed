import 'whatwg-fetch';

describe("SomeCol", () => {
  it("should exist", async () => {
    let response = await fetch('http://localhost:9011/somecol');
    expect(response.status).toEqual(200);
    expect(await response.json()).toEqual([]);
  });
});
