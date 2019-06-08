<template>
  <div class="outside-wrapper">
    <div class="logo">
      <router-link to="/" tag="h1">Demo</router-link>
    </div>
    <div class="color-1"></div>
    <div class="color-2"></div>
    <div class="content px-5 pt-5">
      <div class="row align-items-center">
        <div class="col-lg-6 col-xl-6 text-dark">
          <p class="h3 py-2">Upload Users</p>
          <p>If you would like to seed your mailing with names of people within your organization, add their names here</p>
        </div>
        <div class="col-lg-6 col-xl-3 offset-xl-3 text-lg-right">
          <button class="btn btn-custom btn-custom--alt">Upload User</button>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <table class="table">
            <thead>
              <tr>
                <td scope="col">List name</td>
                <td scope="col">#Recipient</td>
                <td scope="col">Uploaded By</td>
                <td scope="col">Uploaded Date</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Software-Nation Team</td>
                <td>18</td>
                <td>Denis Jonson</td>
                <td>12/12/2018</td>
                <td>
                  <button>...</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped lang="scss">
.outside-wrapper {
  height: 100vh;
  display: grid;
  grid-template-columns: 250px 1fr;
  grid-template-rows: 80px 1fr;
  justify-content: center;
  @media #{$xx-large} {
    grid-template-columns: 350px 1fr;
    grid-template-rows: 120px 1fr;
  }
}
.logo {
  background: $mainColor;
  grid-column: 1 / 2;
  grid-row: 1 / 2;
  display: flex;
  @include flexCenter(row);
  h1 {
    margin: 0;
    text-transform: uppercase;
    font-size: 3rem;
    font-weight: 600;
    cursor: pointer;
    @media #{$xx-large} {
      font-size: 3.5rem;
    }
  }
}
.color-1 {
  background: $mainColor;
  grid-column: 2 / 3;
  grid-row: 1 / 2;
}
.color-2 {
  background: $mainColor;
  grid-column: 1 / 2;
  grid-row: 2 / 3;
}
.content {
  background: $white;
  grid-column: 2 / 3;
  grid-row: 2 / 3;
  color: $textColor;
}
.btn-custom--alt {
  color: $altColor;
  background: $white;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.3);
  display: inline-block;
  width: auto;
  padding: 1rem 2rem;
  text-transform: capitalize;
  &:hover {
    color: $mainColor;
  }
}
</style>

