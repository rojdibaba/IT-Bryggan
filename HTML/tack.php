<?php
$namn = "";
$epost = "";
$amne = "";
$kontaktmetod = "";
$meddelande = "";
$felmeddelande = "";
$skickat = false;

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    $namn = htmlspecialchars(trim($_POST["name"] ?? ""));
    $epost = filter_var($_POST["email"] ?? "", FILTER_SANITIZE_EMAIL);
    $amne = htmlspecialchars(trim($_POST["subject"] ?? "Övrig fråga"));
    $kontaktmetod = htmlspecialchars(trim($_POST["contact_method"] ?? "E-post"));
    $meddelande = htmlspecialchars(trim($_POST["message"] ?? ""));

    if (empty($namn)) {
        $felmeddelande = "Du måste fylla i ditt namn.";
    } elseif (!filter_var($epost, FILTER_VALIDATE_EMAIL)) {
        $felmeddelande = "E-postadressen är inte giltig.";
    } elseif (mb_strlen($meddelande) < 10) {
        $felmeddelande = "Meddelandet måste vara minst 10 tecken långt.";
    } else {

        $skickat = true;
    }
}
?>
<!DOCTYPE html>
<html lang="sv">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Tack för ditt meddelande - Mr.X Portfolio</title>
  <link rel="stylesheet" href="css/style.css">
</head>
<body>

  <header class="site-header">
    <a class="site-header__brand" href="index.html">Mr. X</a>
  </header>

  <main id="main-content" class="page-content">
    <h1 class="page-content__title">Kontaktresultat</h1>
    
    <section class="contact-section">
      <?php if ($skickat): ?>
        <div class="alert alert--success">
          <h2>Tack för ditt meddelande, <?php echo $namn; ?>!</h2>
          <p>Jag har mottagit ditt ärende gällande <strong><?php echo $amne; ?></strong> och återkommer via <strong><?php echo $kontaktmetod; ?></strong> så snart som möjligt.</p>
          <p><a href="index.html" class="contact-form__submit" style="display:inline-block; text-decoration:none; margin-top:1rem;">Tillbaka till startsidan</a></p>
        </div>
      <?php else: ?>
        <div class="alert alert--error">
          <h2>Hoppsan! Något gick fel.</h2>
          <p><?php echo !empty($felmeddelande) ? $felmeddelande : "Du har kommit hit av misstag. Vänligen fyll i kontaktformuläret."; ?></p>
          <p><a href="kontakt.html" class="contact-form__submit" style="display:inline-block; text-decoration:none; margin-top:1rem;">Tillbaka till kontaktformuläret</a></p>
        </div>
      <?php endif; ?>
    </section>
  </main>

  <footer class="site-footer">
    <p class="site-footer__copyright">&copy; 2026 Mr. X Fiktiv portfolio för kursinlämning.</p>
  </footer>

</body>
</html>