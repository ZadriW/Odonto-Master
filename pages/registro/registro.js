document.addEventListener('DOMContentLoaded', function() {
    // Registration form submission
    const registrationForm = document.getElementById('registrationForm');
    
    if (registrationForm) {
        registrationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const formData = new FormData(registrationForm);
            const data = Object.fromEntries(formData.entries());
            
            // Simple validation
            if (!validateForm(data)) {
                return;
            }
            
            // Show loading state
            const registrationButton = registrationForm.querySelector('.registration-button');
            const originalButtonText = registrationButton.innerHTML;
            registrationButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Criando conta...';
            registrationButton.disabled = true;
            
            // Simulate registration process (in a real app, this would be an API call)
            setTimeout(() => {
                // Reset button state
                registrationButton.innerHTML = originalButtonText;
                registrationButton.disabled = false;
                
                // Show success message
                alert('Conta criada com sucesso! Você será redirecionado para a página de login.');
                
                // Redirect to login page (simulated)
                window.location.href = '/pages/login/login.html';
            }, 2000);
        });
    }
    
    // Password strength indicator
    const passwordInput = document.getElementById('password');
    const passwordStrength = document.getElementById('passwordStrength');
    
    if (passwordInput && passwordStrength) {
        passwordInput.addEventListener('input', function() {
            const password = this.value;
            updatePasswordStrength(password);
        });
    }
    
    // CEP search functionality
    const cepInput = document.getElementById('cep');
    const searchCepBtn = document.getElementById('searchCepBtn');
    
    if (cepInput && searchCepBtn) {
        searchCepBtn.addEventListener('click', function() {
            const cep = cepInput.value.replace(/\D/g, '');
            
            if (cep.length !== 8) {
                alert('Por favor, insira um CEP válido com 8 dígitos.');
                return;
            }
            
            // Show loading state
            const originalBtnText = searchCepBtn.innerHTML;
            searchCepBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Buscando...';
            searchCepBtn.disabled = true;
            
            // Simulate CEP search (in a real app, this would be an API call to ViaCEP or similar)
            setTimeout(() => {
                // Reset button state
                searchCepBtn.innerHTML = originalBtnText;
                searchCepBtn.disabled = false;
                
                // Simulate successful CEP search with mock data
                if (cep === '40000000') {
                    document.getElementById('street').value = 'Rua Exemplo';
                    document.getElementById('neighborhood').value = 'Bairro Exemplo';
                    document.getElementById('city').value = 'Salvador';
                    document.getElementById('state').value = 'BA';
                } else {
                    // For other CEPs, show a generic example
                    document.getElementById('street').value = 'Rua dos Testes';
                    document.getElementById('neighborhood').value = 'Centro';
                    document.getElementById('city').value = 'Cidade Exemplo';
                    document.getElementById('state').value = 'EX';
                }
                
                alert('CEP encontrado! Os campos de endereço foram preenchidos automaticamente.');
            }, 1500);
        });
    }
    
    // CPF formatting
    const cpfInput = document.getElementById('cpf');
    if (cpfInput) {
        cpfInput.addEventListener('input', function() {
            let value = this.value.replace(/\D/g, '');
            if (value.length > 11) value = value.substring(0, 11);
            
            if (value.length > 9) {
                value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
            } else if (value.length > 6) {
                value = value.replace(/(\d{3})(\d{3})(\d{1,3})/, '$1.$2.$3');
            } else if (value.length > 3) {
                value = value.replace(/(\d{3})(\d{1,3})/, '$1.$2');
            }
            
            this.value = value;
        });
    }
    
    // Phone formatting
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function() {
            let value = this.value.replace(/\D/g, '');
            if (value.length > 11) value = value.substring(0, 11);
            
            if (value.length > 6) {
                value = value.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
            } else if (value.length > 2) {
                value = value.replace(/(\d{2})(\d{1,5})/, '($1) $2');
            } else if (value.length > 0) {
                value = value.replace(/(\d{1,2})/, '($1');
            }
            
            this.value = value;
        });
    }
    
    // CEP formatting
    const cepField = document.getElementById('cep');
    if (cepField) {
        cepField.addEventListener('input', function() {
            let value = this.value.replace(/\D/g, '');
            if (value.length > 8) value = value.substring(0, 8);
            
            if (value.length > 5) {
                value = value.replace(/(\d{5})(\d{3})/, '$1-$2');
            }
            
            this.value = value;
        });
    }
    
    // Form validation function
    function validateForm(data) {
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!data.email || !emailRegex.test(data.email)) {
            alert('Por favor, insira um e-mail válido.');
            return false;
        }
        
        // CPF validation (basic format check)
        const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
        if (!data.cpf || !cpfRegex.test(data.cpf)) {
            alert('Por favor, insira um CPF válido.');
            return false;
        }
        
        // Full name validation
        if (!data.fullName || data.fullName.trim().length < 3) {
            alert('Por favor, insira seu nome completo.');
            return false;
        }
        
        // Birth date validation
        if (!data.birthDate) {
            alert('Por favor, selecione sua data de nascimento.');
            return false;
        }
        
        // Gender validation
        if (!data.gender) {
            alert('Por favor, selecione seu gênero.');
            return false;
        }
        
        // Password validation
        if (!data.password || data.password.length < 6) {
            alert('A senha deve ter pelo menos 6 caracteres.');
            return false;
        }
        
        // Password confirmation validation
        if (data.password !== data.confirmPassword) {
            alert('As senhas não coincidem.');
            return false;
        }
        
        // Phone validation
        const phoneRegex = /^\(\d{2}\) \d{4,5}-\d{4}$/;
        if (!data.phone || !phoneRegex.test(data.phone)) {
            alert('Por favor, insira um telefone válido.');
            return false;
        }
        
        // Recipient name validation
        if (!data.recipientName || data.recipientName.trim().length < 3) {
            alert('Por favor, insira o nome do destinatário.');
            return false;
        }
        
        // CEP validation
        const cepRegex = /^\d{5}-\d{3}$/;
        if (!data.cep || !cepRegex.test(data.cep)) {
            alert('Por favor, insira um CEP válido.');
            return false;
        }
        
        // Address number validation
        if (!data.number) {
            alert('Por favor, insira o número do endereço.');
            return false;
        }
        
        // RG validation
        if (!data.rg || data.rg.trim().length < 3) {
            alert('Por favor, insira seu RG.');
            return false;
        }
        
        // Profession validation
        if (!data.profession) {
            alert('Por favor, selecione sua profissão.');
            return false;
        }
        
        // Specialization validation
        if (!data.specialization || data.specialization.trim().length < 2) {
            alert('Por favor, insira sua especialização ou semestre.');
            return false;
        }
        
        // Institution validation
        if (!data.institution || data.institution.trim().length < 3) {
            alert('Por favor, insira o nome da instituição.');
            return false;
        }
        
        // Registration number validation
        if (!data.registrationNumber || data.registrationNumber.trim().length < 3) {
            alert('Por favor, insira sua matrícula ou CRO.');
            return false;
        }
        
        // Terms validation
        if (!document.getElementById('terms').checked) {
            alert('Você deve concordar com os termos de uso e política de privacidade.');
            return false;
        }
        
        return true;
    }
    
    // Password strength indicator function
    function updatePasswordStrength(password) {
        const strengthBar = document.createElement('div');
        strengthBar.className = 'password-strength-bar';
        
        if (password.length === 0) {
            passwordStrength.innerHTML = '';
            return;
        }
        
        let strength = 0;
        
        // Length check
        if (password.length >= 8) strength += 1;
        
        // Uppercase check
        if (/[A-Z]/.test(password)) strength += 1;
        
        // Lowercase check
        if (/[a-z]/.test(password)) strength += 1;
        
        // Number check
        if (/\d/.test(password)) strength += 1;
        
        // Special character check
        if (/[^A-Za-z0-9]/.test(password)) strength += 1;
        
        // Update strength bar
        passwordStrength.innerHTML = '';
        passwordStrength.appendChild(strengthBar);
        
        if (strength <= 2) {
            strengthBar.className = 'password-strength-bar password-strength-weak';
        } else if (strength <= 4) {
            strengthBar.className = 'password-strength-bar password-strength-medium';
        } else {
            strengthBar.className = 'password-strength-bar password-strength-strong';
        }
    }
});