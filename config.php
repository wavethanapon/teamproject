<?php

    class Connect extends PDO {
        public function __construct() {
            parent::__construct("mysql:localhost;dbname=Karma","root","karma");
            array(PDO::MYSQL_ATTR_INIT_COMMAND=>"SET NAME utf8");
            $this->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $this->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
        }
    }