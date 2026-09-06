// =====================================================
// E-CAMPUS — STUDENT DASHBOARD LOGIC
// =====================================================

async function loadDashboard() {
    const { data: { user }, error: userError } = await supabaseClient.auth.getUser();

    if (userError || !user) {
        // Not logged in — send back to login page
        window.location.href = 'student-login.html';
        return;
    }

    const { data: studentData, error: studentError } = await supabaseClient
        .from('students')
        .select('*')
        .eq('id', user.id)
        .single();

    if (studentError || !studentData) {
        window.location.href = 'student-login.html';
        return;
    }

    document.getElementById('studentName').textContent = studentData.full_name;
    document.getElementById('welcomeText').textContent = `Welcome back, ${studentData.full_name.split(' ')[0]}`;
}

document.getElementById('logoutBtn').addEventListener('click', async () => {
    await supabaseClient.auth.signOut();
    window.location.href = 'student-login.html';
});

loadDashboard();
