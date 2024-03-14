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
        
        const descriptionTemplate = `Greetings, Earthbound Entities,
        
        The Elder Brain has transcended the far reaches of the astral plane to deliver to you another auditory artifact. This time, a cover of ${songTitle} by ${originalArtist}, reinterpreted through the vocal chords of ${voicePersona}.
        
        ${songTitle} - ${voicePersona} Cover
        
        Sit back and let the cosmic waves of sound envelop your mind. This rendition has been plucked from the strings of the universe and resonates with the echoes of the far realm. May it transport you to the expanse of your own imagination.
        
        If you wish to continue receiving these transmissions, ensure you are connected to this channel by subscribing and activating the celestial bell icon.
        
        Share with fellow travelers of this plane, and let the music of the cosmos bind us together.
        
        For inquiries about the conjurations and enchantments used in my content creation, or to simply share your impressions from the far realm, leave a message in the comments below.
        
        May your auditory canals be always open to the music of the spheres.
        
        Remember, you are under the ever-watchful gaze of the Elder Brain. Embrace the sounds of the universe.
        
        Until our paths converge again,
        ElderBrainTV`;
        
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
                    navigator.clipboard.writeText(descriptionOutput.innerText).then(function() {
                        alert('Description copied to clipboard successfully!');
                    }, function(err) {
                        alert('Error in copying text: ', err);
                    });
                } else {
                    // Fallback method for older browsers
                    const textarea = document.createElement('textarea');
                    textarea.value = descriptionOutput.innerText;
                    document.body.appendChild(textarea);
                    textarea.select();
                    try {
                        const successful = document.execCommand('copy');
                        const msg = successful ? 'successful' : 'unsuccessful';
                        alert('Copying text command was ' + msg);
                    } catch (err) {
                        alert('Oops, unable to copy');
                    }
                    document.body.removeChild(textarea);
                }
            });
        }
    });
});
