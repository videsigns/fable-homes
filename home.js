var income = $("#income");
var rent = $("#rent");
var save = $("#save");
var worth = $("#worth");

var currentSaving = $("#current-saving");
var yearNoFable = $('[vd-custom="year-no-fable"]');
var savingText = $('[vd-custom="savings"]');

var yearFable = $('[vd-custom="year-with-fable"]');
var savingFableText = $('[vd-custom="saving-fable"]');
var timeDeposit;
var timeFableDeposit;

var depositTarget = 0.1;
var yieldVal = 0.06;
var HPI = 0.035;
var FTBappreciation = 0.6;

income.val("55000");
rent.val("900");
save.val("250");
worth.text("240,000");
currentSaving.val("1500");

calcnoFableYear(income.val(), rent.val(), save.val(), currentSaving.val());

$(income).on("change", function () {
  calcnoFableYear(income.val(), rent.val(), save.val(), currentSaving.val());
});

$(rent).on("change", function () {
  calcnoFableYear(income.val(), rent.val(), save.val(), currentSaving.val());
});
$(save).on("change", function () {
  calcnoFableYear(income.val(), rent.val(), save.val(), currentSaving.val());
});

$(currentSaving).on("change", function () {
  calcnoFableYear(income.val(), rent.val(), save.val(), currentSaving.val());
});

function calcnoFableYear(i, r, s, c) {
  income.val(i);
  rent.val(r);
  save.val(s);
  currentSaving.val(c);

  var priceUpTo = 4 * income.val();
  worth.text(priceUpTo.toLocaleString());

  timeDeposit =
    (priceUpTo * depositTarget - currentSaving.val()) /
    (save.val() * 12 - depositTarget * (priceUpTo * HPI));

  timeDeposit = Math.round(timeDeposit);

  if (timeDeposit > 0) {
    yearNoFable.text(timeDeposit);
  } else {
    yearNoFable.text("0");
  }

  var savingCalc = save.val() * 12 - depositTarget * (priceUpTo * HPI);
  savingCalc = Math.round(savingCalc);

  if (timeDeposit > 0) {
    var tt = savingCalc.toLocaleString();
    savingText.text(tt);
  } else {
    savingText.text("0");
  }

  timeFableDeposit =
    ((priceUpTo + priceUpTo * 0.05) * depositTarget - currentSaving.val()) /
    (save.val() * 12 -
      depositTarget * (priceUpTo * HPI) -
      (priceUpTo * yieldVal - rent.val() * 12) -
      99 * 12 +
      priceUpTo * yieldVal * depositTarget +
      priceUpTo * HPI * FTBappreciation);

  timeFableDeposit = Math.round(timeFableDeposit);

  if (timeFableDeposit > 0) {
    yearFable.text(timeFableDeposit);
  } else {
    yearFable.text("0");
  }

  var savingFable =
    save.val() * 12 -
    depositTarget * (priceUpTo * HPI) -
    (priceUpTo * yieldVal - rent.val() * 12) -
    99 * 12 +
    priceUpTo * yieldVal * depositTarget +
    priceUpTo * HPI * FTBappreciation;

  savingFable = Math.round(savingFable);

  if (savingFable > 0) {
    var tt = savingFable.toLocaleString();
    savingFableText.text(tt);
  } else {
    savingFableText.text("0");
  }
}
