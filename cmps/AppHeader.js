export default {
	template: `
        <header class="app-header">
            <h1 class="logo">AppSus</h1>
            <nav>
            <!-- <img class="appsus-logo" src="../assets/img/appsus.jpeg" alt="" /> -->
            <!-- <h1>AppSus</h1> -->
            <nav class="main-nav ">
                <router-link to="/">Home</router-link> | 
                <router-link to="/about">About</router-link> |
                <router-link to="/email">Email</router-link> |
                <router-link to="/note">Note</router-link> |
                <!-- <router-link to="/book">Book</router-link>  -->

            </nav>
        </header>
    `,
}
