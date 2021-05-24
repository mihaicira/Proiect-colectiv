$("#formular-container").append(`
<h2>Formular pentru trimiterea contributiilor</h2>
    <form>
        <h3>Propunere contributie</h3>

<!--        1. limba-articol-->
        <h4>Limba în care este scris articolul:</h4>
            <select id="limba-articol">
                    <option>Engleză (UK)</option>
                    <option>Franceză (Franța)</option>
                    <option>Germană (Germania)</option>
                    <option>Italiană (Italia)</option>
                    <option>Spaniolă (Spania)</option>
            </select>

        <br><br><hr><br><br>

<!--        2. rubrica-->
            <h4>Rubrica:</h4>
            <select id="rubrica">
                <option>Articole tematice</option>
                <option>Articole non tematice</option>
                <option>Convorbiri (personalități în domeniul francofoniei)</option>
                <option>Recenzii</option>
                <option>Traduceri inedite (texte francofone, franceze contemporane)</option>
            </select>

        <br><br><hr><br><br>

<!--        3. verificare-documente-trimise-->
            <h4>Lista verificare documente trimise</h4>
            <p>Declarație pe proprie răspundere înainte de a continua procesul de expediere a documentului supus atenției redacției:</p>
            <input type="checkbox" id="verificare" name="verificare" value="yes">
            <label for="verificare">Am citit condițiile de colaborare și sunt de-acord cu acestea.</label>

        <br><br><hr><br><br>

<!--        4. calitate -->
            <h4>Calitatea celui care face propunerea</h4>
            <br>
            <input type="radio" id="Autor" name="calitate" value="Autor">
            <label for="Autor">Autor</label>

            <br>
            <input type="radio" id="Recenzent" name="calitate" value="Recenzent">
            <label for="Recenzent">Recenzent</label>

            <br>
            <input type="radio" id="Reporter/jurnalist" name="calitate" value="Reporter/jurnalist">
            <label for="Reporter/jurnalist">Reporter/jurnalist</label>

            <br>
            <input type="radio" id="Traducator" name="calitate" value="Traducator">
            <label for="Traducator">Traducator</label>

        <br><br><hr><br><br>

<!--        5. originalitate-->

        <h4>Declarație pe proprie răspundere pentru originalitatea documentului supus atenției Redacției și autorizarea Redacției de a face ajustările textuale în confirmitate cu protocolul de tehnoredactare al revistei. Declarație de acceptare a cesiunii drepturilor de autor (Copyright Statement).</h4>
        <input type="checkbox" id="originalitate" name="originalitate" value="yes">
        <label for="originalitate">Accept și voi respecta condițiile declarației referitoare la drepturile de autor / J'accepte et respecterai les conditions de la déclaration de droit d'auteur.</label>

        <br>
        <input type="checkbox" id="colectare-date" name="colectare-date" value="yes">
        <label for="colectare-date">Accept ca datele mele să fie colectate și stocate în conformitate cu <a href="https://periodicos.unb.br/index.php/belasinfieis/about/privacy" target="_blank">declarația de confidențialitate</a> / Oui, j'accepte que mes données soient collectées et stockées conformément à la <a href="https://periodicos.unb.br/index.php/belasinfieis/about/privacy" target="_blank">Déclaration de confidentialité</a>.</label>

        <br><br><hr><br><br>

<!--        6. incarcare fisier-->
        <h3>Încărcare articol propus</h3>
        <p>A se încărca toate fișierele necesare echipei editorial pentru a efectua evaluarea, amandoua in format <b>word (.doc/.docx)</b>.</p>
        <p>1. Articolul propus anonimizat</p>
        <input type="file" name="filename" id="articol-fisier">

        <p>2. Nota bibliografica (100 de cuvinte)</p>
        <input type="file" name="notabib" id="nota-fisier">

        <br><br><hr><br><br>

        <h3>Completare metadate</h3>
<!--        7. article-initial-->
        <div class="pair-10">
            <label>Articol initial</label>
            <select id="Articol-initial">
                <option>Un</option>
                <option>Une</option>
                <option>Le</option>
                <option>La</option>
            </select>
        </div>
        <br><br>
<!--        8. titre-->
        <div class="pair-10">
            <label>Titlu</label>
            <input id="titlu" class="text">
        </div>

        <br><br>
<!--        9. sous-titre-->
        <div class="pair-10">
            <label>Sub-titlu</label>
            <input id="sub-titlu" class="text">
        </div>

        <br><br>

<!--        10. rezumat-->
        <label>Rezumat</label><br>
        <textarea rows="10" id="rezumat"></textarea>

        <br><br><hr><br><br>

<!--        co-autori-->

        <h4>Adăugare autori</h4>

        <table id="persons-table">
            <tr>
                <th>Nume</th>
                <th>Contact</th>
                <th>Rol</th>
                <th>Autor corespondent</th>
                <th>Sterge</th>
            </tr>
        </table>
        <div id="fillPersons">
                <div class="pair-10">
                    <label>Nume</label><input id="fill-person-name">
                </div>
            <br>
                <div class="pair-10">
                    <label>Contact</label><input id="fill-person-contact">
                </div>
            <br>
                <div class="pair-10">
                    <label>Rol</label><input id="fill-person-role">
                </div>
            <br>
            <button id="addPerson" type="button"></button>
        </div>

        <br><br><hr><br><br>
<!--        11.-->
        <h4>Limba</h4>
        <select id="limba-dwn">
            <option>Engleză (UK)</option>
            <option>Franceză (Franța)</option>
            <option>Germană (Germania)</option>
            <option>Italiană (Italia)</option>
            <option>Spaniolă (Spania)</option>
        </select>

        <br><br><hr><br><br>

<!--        12.-->
        <h4>Cuvinte cheie</h4>
        <p>Maxim 5 cuvinte cheie, separate prin virgulă</p>
        <textarea rows="2" id="cuvinte-cheie"></textarea>


        <br><br><hr><br><br>

<!--        13.-->
        <h4>Referințe bibliografice</h4>
        <p>Sa cuprinda exact lucrarile citate (nu bibliografie generala)</p>
        <textarea cols="5" rows="15" id="referinte" ></textarea>

        <br><br>

        <input type="submit" id="submit">
    </form>
`)