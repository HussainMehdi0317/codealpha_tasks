function calculateAge() {
  let dob = document.getElementById("dob").value;
  if (!dob) {
    document.getElementById("result").innerText =
      "Please select a date of birth.";
    return;
  }
  let dobDate = new Date(dob);
  let today = new Date();

  let years = today.getFullYear() - dobDate.getFullYear();
  let months = today.getMonth() - dobDate.getMonth();
  let days = today.getDate() - dobDate.getDate();

  if (days < 0) {
    months--;
    days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
  }
  if (months < 0) {
    years--;
    months += 12;
  }

  document.getElementById(
    "result"
  ).innerText = `You are ${years} years, ${months} months, and ${days} days old.`;
}

document.getElementById("dob").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
      calculateAge();
    }
  });