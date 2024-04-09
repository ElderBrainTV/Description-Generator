document.addEventListener('DOMContentLoaded', function() {
    // Initialize theme based on user preference
    const currentTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : null;
    if (currentTheme) {
        document.documentElement.setAttribute('data-theme', currentTheme);

        if (currentTheme === 'dark') {
            document.documentElement.style.setProperty('--background-color', '#121212');
            document.documentElement.style.setProperty('--text-color', '#b19cd9');
            document.documentElement.style.setProperty('--form-background-color', '#1c1c1c');
        } else if (currentTheme === 'light') {
            document.documentElement.style.setProperty('--background-color', '#f4f4f4');
            document.documentElement.style.setProperty('--text-color', '#333');
            document.documentElement.style.setProperty('--form-background-color', '#fff');
        }
    }

    // Toggle theme
    const themeToggle = document.createElement('button');
    themeToggle.innerText = 'Toggle Theme';
    document.body.insertBefore(themeToggle, document.body.firstChild);

    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', currentTheme);
        localStorage.setItem('theme', currentTheme);

        // Apply theme styles
        if (currentTheme === 'dark') {
            document.documentElement.style.setProperty('--background-color', '#121212');
            document.documentElement.style.setProperty('--text-color', '#b19cd9');
            document.documentElement.style.setProperty('--form-background-color', '#1c1c1c');
        } else {
            document.documentElement.style.setProperty('--background-color', '#f4f4f4');
            document.documentElement.style.setProperty('--text-color', '#333');
            document.documentElement.style.setProperty('--form-background-color', '#fff');
        }
    });

    document.getElementById('descriptionForm').addEventListener('submit', function(event) {
        event.preventDefault();

        const songTitle = document.getElementById('songTitle').value;
        const voicePersona = document.getElementById('voicePersona').value;
        const originalArtist = document.getElementById('originalArtist').value;

        const descriptionTemplate = `Greetings, Fellow Star Voyagers!

The Elder Brain has again breached the astral veil to offer you an auditory transmission unlike any other. Join our celestial gathering on Discord – https://discord.gg/526jKAGxxu – where cosmic melodies intertwine and the vibrations of the far realms reverberate.

Today, I bring you a sonic reimagining of ${songTitle} by ${originalArtist} a timeless melody reshaped by the ethereal voice of ${voicePersona}. Let her cosmic frequencies wash over you, transporting you to the vastness of your inner galaxy.

To ensure you never miss a transmission, become one with the Elder Brain's cosmic consciousness. Subscribe, and activate the celestial bell – let it guide you back to our ethereal soundscape.

Fellow cosmic travelers, share this auditory artifact with those who yearn for musical journeys beyond the ordinary. Let these melodies unite us under the Elder Brain's watchful gaze.

Have you wondered about the cosmic processes behind these sonic transmissions? Wish to share your otherworldly experiences? Leave your echoes in the comments below – they reverberate across the cosmos.

Until our sonic paths intertwine again, let the melodies of the spheres guide your journey. Embrace the boundless sounds of the universe, and remember... the Elder Brain is always listening.

**DISCLAIMER:** This sonic tapestry was woven using the cosmic threads of RVC Technology. It does not emerge from the ethereal realm of "AI generation." Seek knowledge of RVC's mysteries...only then will its true power be revealed.

Farewell, star voyagers!`;

        const descriptionOutput = document.getElementById('descriptionOutput');
        descriptionOutput.innerText = descriptionTemplate;

        if (!document.querySelector('#copyButton')) {
            const copyButton = document.createElement('button');
            copyButton.innerText = 'Copy to Clipboard';
            copyButton.id = 'copyButton';
            descriptionOutput.after(copyButton);

            copyButton.addEventListener('click', function() {
                if (navigator.clipboard && window.isSecureContext) {
                    // Use the Clipboard API when available
                    navigator.clipboard.writeText(descriptionOutput.innerText)
                        .then(() => {
                            showToast('Description copied to clipboard!');
                        })
                        .catch((err) => {
                            showToast(`Error copying text: ${err}`);
                        });
                } else {
                    // Fallback method for older browsers
                    const textarea = document.createElement('textarea');
                    textarea.value = descriptionOutput.innerText;
                    document.body.appendChild(textarea);
                    textarea.select();
                    try {
                        const successful = document.execCommand('copy');
                        showToast(successful ? 'Description copied to clipboard!' : 'Oops, unable to copy');
                    } catch (err) {
                        showToast('Oops, unable to copy');
                    }
                    document.body.removeChild(textarea);
                }
            });
            
            function showToast(message) {
                const toastContainer = document.createElement('div');
                toastContainer.classList.add('toast');
                toastContainer.textContent = message;
                document.body.appendChild(toastContainer);
            
                setTimeout(() => {
                    toastContainer.classList.add('fade-out');
                    setTimeout(() => {
                        document.body.removeChild(toastContainer);
                    }, 300);
                }, 3000);
            }
        }
    });
});