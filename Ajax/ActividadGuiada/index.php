<?php
// obrir el fitxer on es guarden les dades
$fichero = "resultado.txt";
$contenido= file($fichero);
$array = explode("@", $contenido[0]);
$rea =$array[0];
$bar =$array[1];
$atl =$array[2];
$val =$array[3];
// extraure el bot dels participants
$voto = $_GET['voto'];
//actualitzem els vors afegit
switch ($voto) {
    case 0:
        ++$rea;
        break;
    case 1:
        ++$bar;
        break;
    case 2:
        ++$atl;
        break;
    case 3:
        ++$val;
        break;
}

// se calcula el %
$denominador= (int)$rea + (int)$bar + (int)$atl +(int)$val;
$tantoRea= 100* round($rea/$denominador,2);
$tantoBar= 100* round($bar/$denominador,2);
$tantoAtl= 100* round($atl/$denominador,2);
$tantoVal= 100* round($val/$denominador,2);
?>
<h2> Resultado:</h2>
<table>
    <tr>
        <td>Real Madrid:</td>
        <td>
            <img src="barrita.png" width='<?=$tantoRea; ?>' height='20'> <?=$tantoRea; ?>%
        </td>
    </tr>
    <tr>
        <td>Barcelona:</td>
        <td>
            <img src="barrita.png" width='<?=$tantoBar; ?>' height='20'> <?=$tantoBar; ?>%
        </td>
    </tr>
    <tr>
        <td>Atlético de Madrid:</td>
        <td>
            <img src="barrita.png" width='<?=$tantoAtl; ?>' height='20'> <?=$tantoAtl; ?>%
        </td>
    </tr>
    <tr>
        <td>València:</td>
        <td>
            <img src="barrita.png" width='<?=$tantoVal; ?>' height='20'> <?=$tantoVal; ?>%
        </td>
    </tr>
</table>
.