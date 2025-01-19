document.addEventListener('DOMContentLoaded', function() {
  function checkLoginStatus() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const currentPage = window.location.pathname;
    if (!isLoggedIn && currentPage !== '/html/login.html') {
      window.location.href = '../html/login.html';
    }
  }

  

  checkLoginStatus();
  const loginForm = document.getElementById('loginForm');
  const registerForm = document.getElementById('registerForm');
  const loginBtn = document.getElementById('loginBtn');
  const registerBtn = document.getElementById('registerBtn');



  // Hiển thị form login theo dấu mặc định
  loginForm.style = "display:block;"
  registerForm.style = "display:none;"

    loginBtn.addEventListener('click', () => switchForm('login'));
    registerBtn.addEventListener('click', () => switchForm('register'));

    function switchForm(formType) {
        if (formType === 'login') {
          loginForm.style = "display:block;"
          registerForm.style = "display:none;"
          loginBtn.classList.add("active")
          registerBtn.classList.remove("active")
        } else {
          loginForm.style = "display:none;"
          registerForm.style = "display:block;"
          loginBtn.classList.remove("active")
          registerBtn.classList.add("active")
        }
    }


    if (loginForm) {
      loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const username = document.getElementById('loginUsername').value.trim();
        const password = document.getElementById('loginPassword').value.trim();
        const rememberMe = document.getElementById('rememberMe').checked;
  
        const userData = localStorage.getItem(username);
        if (userData) {
          const user = JSON.parse(userData);
          if (user.password === password) {
            alert(`Login successful! Welcome back, ${username}. You registered on ${new Date(user.registrationDate).toLocaleDateString()}`);
            if (rememberMe) {
              localStorage.setItem('rememberedUser', username);
            } else {
              localStorage.removeItem('rememberedUser');
            }
            localStorage.setItem('isLoggedIn', 'true');
            window.location.href = '/index.html';
          } else {
            alert('Invalid password. Please try again.');
          }
        } else {
          alert('User not found. Please register first.');
        }
      });
    }
  

    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const username = document.getElementById('registerUsername').value.trim();
        const password = document.getElementById('registerPassword').value.trim();
        const confirmPassword = document.getElementById('confirmPassword').value.trim();

        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }

        if (localStorage.getItem(username)) {
            alert('Username already exists!');
            return;
        }

        localStorage.setItem(username, JSON.stringify({
            password: password,
            registrationDate: new Date().toISOString()
        }));

        alert('Registration successful! You can now log in.');
        switchForm('login');
    });
    const rememberedUser = localStorage.getItem('rememberedUser');
    if (rememberedUser) {
        document.getElementById('loginUsername').value = rememberedUser;
        document.getElementById('rememberMe').checked = true;
    }
});


document.addEventListener('DOMContentLoaded', function() {
    const calorieCalculatorForm = document.getElementById('calorieCalculatorForm');
    const calorieResult = document.getElementById('calorieResult');
    const dailyCalorieList = document.getElementById('dailyCalorieList');
    const totalCaloriesSpan = document.getElementById('totalCalories');

    let dailyCalories = 0;

    const APP_ID = 'bffa389c';
    const API_KEY = 'c5d9fd18ec5ef3dbfe66d3716ebb61f9';

    calorieCalculatorForm?.addEventListener('submit', function(e) {
      e.preventDefault();
      const foodItem = document.getElementById('foodItem').value;

      fetch('https://trackapi.nutritionix.com/v2/natural/nutrients', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-app-id': APP_ID,
          'x-app-key': API_KEY,
        },
        body: JSON.stringify({
          query: foodItem
        })
      })
      .then(response => response.json())
      .then(data => {
        if (data.foods && data.foods.length > 0) {
          const food = data.foods[0];
          const calories = Math.round(food.nf_calories);
          const servingUnit = food.serving_unit;
          const servingQty = food.serving_qty;

          calorieResult.innerHTML = `<strong>${food.food_name}</strong> (${servingQty} ${servingUnit}) contains approximately <strong>${calories}</strong> calories.`;

          const listItem = document.createElement('li');
          listItem.className = 'list-group-item bg-dark text-light';
          listItem.textContent = `${food.food_name}: ${calories} calories`;
          dailyCalorieList.appendChild(listItem);

          dailyCalories += calories;
          totalCaloriesSpan.textContent = dailyCalories;
          localStorage.setItem('dailyCalories', dailyCalories);
          let logItems = JSON.parse(localStorage.getItem('logItems')) || [];
          logItems.push({ name: food.food_name, calories: calories });
          localStorage.setItem('logItems', JSON.stringify(logItems));
        } else {
          calorieResult.textContent = 'Food item not found. Please try another item.';
        }
      })
      .catch(error => {
        console.error('Error:', error);
        calorieResult.textContent = 'An error occurred. Please try again later.';
      });
    });
  });

  function updateDailyLog() {
    const logDate = document.getElementById('logDate');
    const totalCalories = document.getElementById('totalCalories');
    const logList = document.getElementById('logList');

    if (logDate && totalCalories && logList) {
        const currentDate = new Date().toLocaleDateString();
        logDate.textContent = `Log for ${currentDate}`;

        const dailyCalories = localStorage.getItem('dailyCalories') || 0;
        totalCalories.textContent = dailyCalories;

        const logItems = JSON.parse(localStorage.getItem('logItems')) || [];
        logList.innerHTML = '';
        logItems.forEach(item => {
            const listItem = document.createElement('li');
            listItem.className = 'list-group-item bg-dark text-light';
            listItem.textContent = `${item.name}: ${item.calories} calories`;
            logList.appendChild(listItem);
        });
    }
}


  document.addEventListener('DOMContentLoaded', updateDailyLog);


  document.addEventListener('DOMContentLoaded', function() {
    var scrollToTopBtn = document.getElementById("scrollToTopBtn");
  
    window.onscroll = function() {
      if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        scrollToTopBtn.classList.add("show");
      } else {
        scrollToTopBtn.classList.remove("show");
      }
    };
  
    scrollToTopBtn?.addEventListener("click", function() {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  });
