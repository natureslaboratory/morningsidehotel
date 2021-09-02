<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8" />
	<title><?php perch_pages_title(); ?></title>
	<?php perch_page_attributes(); ?>
    <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1" />
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Lora:wght@400;600;700&display=swap" rel="stylesheet">
    <link href="/assets/css/base.css?v=<?= rand() ?>" rel="stylesheet" type="text/css" />
    <link href="/assets/css/responsive-nav.css?v=<?= rand() ?>" rel="stylesheet" type="text/css" />
    <link href="/assets/css/layout.css?v=<?= rand() ?>" rel="stylesheet" type="text/css" />
    <link href="/assets/css/index.css?v=<?= rand() ?>" rel="stylesheet" type="text/css" />
</head>
<body>

<body>
    <div class="l-wrap c-header__wrapper">
        <div class="l-block l-block--padding-none">
            <div class="c-header">
                <div class="c-logo">
                    <p>MH</p>
                </div>
                <div class="c-navigation show" data-breakpoint="500" data-type="dynamic" data-padding="-20" data-set-max-width="false">
                    <?php 
                    
                    perch_pages_navigation(array(
                        'template' => array('topNavMain.html', 'topNavSub.html')
                    ));

                    ?>
                    <div class="c-hamburger hide">
                    <button class="c-hamburger__button c-navbar__button">
                        <a class="c-navbar__link c-navbar__link--hover-invert c-navbar__link--fixed-size">Menu</a>
                    </button>
                    <?php
                    perch_pages_navigation(array(
                        'template' => array('hamburgerMain.html', 'hamburgerSub.html')
                    ))
                    ?>
                </div>
                </div>
            </div>
        </div>
    </div>