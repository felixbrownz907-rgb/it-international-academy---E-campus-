// =====================================================
// E-CAMPUS — STUDENT LOGIN LOGIC
// =====================================================

const loginForm = document.getElementById('loginForm');
const errorMsg = document.getElementById('errorMsg');

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;

    errorMsg.style.display = 'none';

    const submitButton = loginForm.querySelector('.auth-button');
    submitButton.disabled = true;
    submitButton.textContent = 'Logging in...';

    // Step 1: Check credentials with Supabase Auth
    const { data: authData, error: authError } = await supabaseClient.auth.signInWithPassword({
        email: email,
        password: password
    });

    if (authError) {
        errorMsg.textContent = 'Incorrect email or password. Please try again.';
        errorMsg.style.display = 'block';
        submitButton.disabled = false;
        submitButton.textContent = 'Login';
        return;
    }

    // Step 2: Confirm this user has a matching student profile
    const { data: studentData, error: studentError } = await supabaseClient
        .from('students')
        .select('*')
        .eq('id', authData.user.id)
        .single();

    if (studentError || !studentData) {
        errorMsg.textContent = 'No student profile found for this account. Please contact your administrator.';
        errorMsg.style.display = 'block';
        submitButton.disabled = false;
        submitButton.textContent = 'Login';
        await supabaseClient.auth.signOut();
        return;
    }

    // Step 3: Check approval status
    if (studentData.application_status !== 'approved') {
        errorMsg.textContent = 'Your account is not yet approved. Please contact your administrator.';
        errorMsg.style.display = 'block';
        submitButton.disabled = false;
        submitButton.textContent = 'Login';
        await supabaseClient.auth.signOut();
        return;
    }

    // Success — send them to the student dashboard
    window.location.href = 'student-dashboard.html';
});
