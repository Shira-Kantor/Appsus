export default {
	template: `
        <header class="app-header">
            <img class="appsus-logo" src="../assets/img/appsus.jpeg" alt="" />
            <!-- <h1>AppSus</h1> -->
            <nav class="main-nav">
                <router-link to="/">Home</router-link> | 
                <router-link to="/about">About</router-link> |
                <router-link to="/email">Email</router-link> |
                <router-link to="/note">Note</router-link>

            </nav>
        </header>
    `,
}
