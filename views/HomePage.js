export default {
    template: `
        <section class="home-page">

            <h1 class="home-title">Welcome to Appsus</h1>
            <hr />
        <div class="home-links">
            <router-link to="/email">
                <article class="home-gmail"></article>
            </router-link> 
            
            <!-- <router-link to="/book">
                <article class="home-books"></article>
            </router-link>  -->
            
            <router-link to="/note">
                <article class="home-keep"></article>
            </router-link>
        </div>

        </section>
    `,
}
