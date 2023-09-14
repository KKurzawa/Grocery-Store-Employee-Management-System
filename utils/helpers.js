module.exports = {
    user_info: (loggedIn) => {
        return `
        <script type="text/javascript">
            const userLoggedIn = ${Boolean(loggedIn)};
        </script>
        `;
    }
}